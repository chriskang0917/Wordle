import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useContext } from "react";
import toast from "react-hot-toast";
import WordContext, { InitContext } from "../store/WordProvider";

type ContextType = React.Context<InitContext>;

export default function Actions() {
  const { state, dispatch } = useContext(WordContext as ContextType);
  const { answerWord, hasWin } = state;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatchReset = () => {
    if (typeof dispatch !== "function") return;
    dispatch({ type: "reset_answer" });
  };

  const handleAnswer = () => {
    if (!hasWin) toast.error(`很可惜沒能完成，答案是 ${answerWord}`);
    dispatchReset();
  };

  return (
    <section className="mx-auto mt-8 flex max-w-[350px] items-center justify-between px-2">
      <Button
        className="text-md tracking-wider"
        variant="ghost"
        color="warning"
        onClick={handleAnswer}
      >
        {hasWin ? "再來一局" : "查看答案"}
      </Button>
      <Button
        className="text-md tracking-wider"
        variant="ghost"
        color="success"
        onPress={onOpen}
      >
        顯示玩法
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl tracking-wider">
                Wordle 玩法說明
              </ModalHeader>
              <ModalBody>
                <Chip color="warning">溫馨提醒</Chip>
                <p className="tracking-wide">
                  目前僅限以 <strong>桌面版</strong> 遊玩。
                </p>
                <Divider />
                <h2 className="text-lg font-bold">遊戲規則</h2>
                <ul className="leading-6 tracking-wide">
                  <li>每一次一定要猜 5 個單字。</li>
                  <li>每一次重新整理，就會改變題目。</li>
                  <li>同一個字母的總數，僅會出現相等的綠色與紅色數量。</li>
                </ul>
                <h2 className="mt-4 text-lg font-bold">
                  按下 Enter 確認單字後...
                </h2>
                <ul className="list-disc pl-4 leading-6 tracking-wide">
                  <li>綠色代表位置正確</li>
                  <li>橘色代表該字母存在但位置錯誤</li>
                  <li>灰色代表該字母不存在</li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  關閉說明
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
