import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useTodoContext } from "../../Context/TodoContext";
import { FC, useState } from "react";
import Todo from "../../interfaces/Todo";

const Task: FC<Todo> = ({ id, text, isCompleted }) => {
  const { deleteTodo, updateText, updateIsCompleted } = useTodoContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(text);
  return (
    <Card
      key={id}
      variant={"outline"}
      width={"100%"}
      marginY={"4"}
      bg={isCompleted ? "green.400" : "whiteAlpha"}
    >
      <CardBody>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"}>
            {new Date(id).getDate() == new Date().getDate() && (
              <Button
                marginRight={"4"}
                bg={isCompleted ? "green.400" : "whiteAlpha"}
                textColor={isCompleted ? "white" : "green.400"}
                onClick={() => updateIsCompleted(id, !isCompleted)}
              >
                <CheckIcon />
              </Button>
            )}
            <Text>{text}</Text>
          </Flex>
          <Flex>
            {!isCompleted && (
              <>
                <Button
                  marginRight={"4"}
                  onClick={() => {
                    setIsEditing((e) => !e);
                  }}
                >
                  <EditIcon boxSize={4} />
                </Button>
                <Button
                  data-testid="delete-element"
                  onClick={() => deleteTodo(id)}
                >
                  <DeleteIcon color={"red"} boxSize={4} />
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        {isEditing && (
          <Flex width="100%">
            <form style={{ width: "100%" }}>
              <InputGroup
                width="100%"
                size="lg"
                marginY={"10"}
                alignItems={"center"}
              >
                <Input
                  onChange={(e) => setNewValue(e.target.value)}
                  height="4.5rem"
                  width="100%"
                  value={newValue}
                  placeholder="what need to do"
                />
                <InputRightElement height="4.5rem" width="4.5rem">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (newValue.trim() === "") return false;
                      updateText(id, newValue);
                      setIsEditing(false);
                    }}
                    type="submit"
                    height="4.3rem"
                    width="4.3rem"
                  >
                    <CheckIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          </Flex>
        )}
      </CardBody>
    </Card>
  );
};
export default Task;
