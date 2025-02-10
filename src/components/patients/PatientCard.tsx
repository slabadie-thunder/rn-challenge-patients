import { useRef, useState } from "react";
import { Animated, Linking } from "react-native";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

import type { Patient } from "@/api";
import { DEFAULT_AVATAR } from "@/constants/constants";
import { Button } from "../Button";
import { ButtonColumn } from "../ButtonColumn";
import { Column, Row } from "../flex";
import { Image } from "../Image";
import { Typography } from "../Typography";

type PatientCardProps = {
  patient: Patient;
  onEditPatient: (patient: Patient) => void;
  onDeletePatient: (patient: Patient) => void;
  onFavoritePatient: (patient: Patient) => void;
};

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onFavoritePatient: () => void,
  onDeletePatient: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.get() + 380 }],
      width: "100%",
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Row className="h-full">
        <ButtonColumn
          variant="favorite"
          title="Favorite"
          icon="heart"
          className="w-1/2"
          textClasses="text-white"
          iconColor="white"
          rounded="none"
          onPress={onFavoritePatient}
        />
        <ButtonColumn
          variant="danger"
          title="Delete"
          icon="delete"
          className="w-1/2"
          rounded="none"
          textClasses="text-white"
          iconColor="white"
          onPress={onDeletePatient}
        />
      </Row>
    </Reanimated.View>
  );
}

const PatientCard = ({
  patient,
  onEditPatient,
  onDeletePatient,
  onFavoritePatient,
}: PatientCardProps) => {
  const [error, setError] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(20)).current;
  const swipeableRef = useRef<SwipeableMethods>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.spring(animatedHeight, {
      toValue: isExpanded ? 20 : 100,
      useNativeDriver: false,
      friction: 10,
      tension: 40,
    }).start();
  };

  const handleFavorite = () => {
    onFavoritePatient(patient);
    swipeableRef.current?.close();
  };

  const handleDelete = () => {
    onDeletePatient(patient);
    swipeableRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={{
        alignItems: "center",
      }}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) =>
        RightAction(
          progressAnimatedValue,
          dragAnimatedValue,
          handleFavorite,
          handleDelete,
        )
      }
    >
      <Row justify="between" className="w-full">
        <Column className="w-11/12">
          <Row gap="sm">
            <Image
              source={{
                uri: error || !patient.avatar ? DEFAULT_AVATAR : patient.avatar,
              }}
              onError={() => setError(true)}
              avatar
            />
            <Column align="start">
              <Typography font="bold" onPress={() => onEditPatient(patient)}>
                {patient.name}
              </Typography>
              {patient.website ? (
                <Typography
                  color="tertiary"
                  numberOfLines={1}
                  className="max-w-80 underline"
                  onPress={() => Linking.openURL(patient.website)}
                >
                  {patient.website}
                </Typography>
              ) : null}
            </Column>
          </Row>
          <Row className="overflow-hidden">
            <Animated.View style={{ maxHeight: animatedHeight }}>
              <Typography size="body" font="bold" alignment="left">
                {patient.description}
              </Typography>
            </Animated.View>
          </Row>
        </Column>

        <Column className="w-1/12">
          <Button
            variant="ghost"
            icon={isExpanded ? "arrowup" : "arrowdown"}
            onPress={toggleExpand}
          ></Button>
        </Column>
      </Row>
    </Swipeable>
  );
};

export { PatientCard };
