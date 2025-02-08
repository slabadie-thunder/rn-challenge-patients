import { useState, useRef } from "react";
import { Linking, Animated } from "react-native";

import type { Patient } from "@/api";
import { DEFAULT_AVATAR } from "@/constants/constants";
import { Button } from "../Button";
import { Column, Row } from "../flex";
import { Image } from "../Image";
import { Typography } from "../Typography";

type PatientCardProps = {
  patient: Patient;
};

const PatientCard = ({ patient }: PatientCardProps) => {
  const [error, setError] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(20)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.spring(animatedHeight, {
      toValue: isExpanded ? 20 : 100,
      useNativeDriver: false,
      friction: 10,
      tension: 40
    }).start();
  };

  return (
    <Row justify="between">
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
            <Typography font="bold">{patient.name}</Typography>
            {patient.website ? (
              <Typography
                color="tertiary"
                className="underline"
                onPress={() => Linking.openURL(patient.website)}
              >
                {patient.website}
              </Typography>
            ) : null}
          </Column>
        </Row>
        <Row className="overflow-hidden">
          <Animated.View style={{ maxHeight: animatedHeight }}>
            <Typography
              size="body"
              font="bold"
              alignment="left"
            >
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
  );
};

export { PatientCard };
