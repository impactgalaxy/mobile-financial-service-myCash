import { useForm } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/ContextProvider";
export default function Register() {
  const { createUser } = useContext(AuthContext);
  const [userType, setUserType] = useState("No");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    // values.userType = userType;
    // const { email, PIN } = values;
    // console.log(values, email, PIN);
    // try {
    //   const response = await createUser(email, PIN);
    //   console.log(response.user);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const res = await axios.post(
        "http://localhost:5000/create-users",
        values
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container md:w-1/2 mx-auto p-5">
      <h1 className="font-bold md:text-xl">
        Welcome to create account for my cash
      </h1>
      <div className="pt-8 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">User name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Enter name"
              {...register("name", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">User email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.PIN}>
            <FormLabel htmlFor="PIN">Enter your PIN</FormLabel>
            <Input
              id="PIN"
              placeholder="5-digit PIN"
              {...register("PIN", {
                required: "PIN is required",
                pattern: { value: /^[0-9]+$/, message: "Only number is valid" },
                minLength: { value: 5, message: "PIN length should be 5" },
              })}
            />
            <FormErrorMessage>
              {errors.PIN && errors.PIN.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.number}>
            <FormLabel htmlFor="number">Enter you number</FormLabel>
            <Input
              id="number"
              placeholder="Phone number"
              {...register("number", {
                required: "Phone number is required",
              })}
            />
            <FormErrorMessage>
              {errors.number && errors.number.message}
            </FormErrorMessage>
          </FormControl>
          <div>
            <h1 className="font-bold">
              Do you want to create account for agent?
            </h1>
            <RadioGroup onChange={setUserType} value={userType}>
              <Stack direction="row">
                <Radio value="No">No</Radio>
                <Radio value="Yes">Yes</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <Flex alignItems="center" justifyContent="center" p="5px">
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              Create Account
            </Button>
          </Flex>
          <div className="py-4">
            <h1>
              Already have an account? Please{" "}
              <Link to="/" className="font-bold underline">
                Login
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}
