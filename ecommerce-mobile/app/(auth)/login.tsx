import { login } from "@/api/auth";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  // useMutation({ mutationFn: () => login });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <FormControl
        style={{
          width: "100%",
          maxWidth: 500,
        }}
        className="p-4 border rounded-lg border-outline-300 bg-white m-2"
      >
        <VStack space="xl">
          <Heading className="text-typography-900">Login</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px]">
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField type={showPassword ? "text" : "password"} />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <HStack space="sm">
            <Button className="flex-1" variant="outline" onPress={() => {}}>
              <ButtonText>Register</ButtonText>
            </Button>
            <Button className="flex-1" onPress={() => {}}>
              <ButtonText>Login</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </FormControl>
    </View>
  );
}
