import { View } from "react-native";

import { Button, Row, Typography } from "@/components";

export default function Buttons() {
  return (
    <View className="flex flex-1 items-center justify-center gap-10 p-4">
      <View className="items-center">
        <Typography>Filled</Typography>
        <Row className="flex flex-row items-center gap-4">
          <Button title="SM" onPress={() => {}} />
          <Button title="MD" onPress={() => {}} />
          <Button title="LG" onPress={() => {}} />
        </Row>
      </View>
      <View className="items-center">
        <Typography>Outline</Typography>
        <View className="flex-row items-center gap-4">
          <Button variant="outline" title="SM" onPress={() => {}} />
          <Button variant="outline" title="MD" onPress={() => {}} />
          <Button variant="outline" title="LG" onPress={() => {}} />
        </View>
      </View>
      <View className="items-center">
        <Typography>Transparent</Typography>
        <View className="flex-row items-center gap-4">
          <Button variant="ghost" title="SM" onPress={() => {}} />
          <Button variant="ghost" title="MD" onPress={() => {}} />
          <Button variant="ghost" title="LG" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
