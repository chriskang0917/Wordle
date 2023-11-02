import { Button } from "@nextui-org/react";

export default function Actions() {
  return (
    <section className="mx-auto mt-8 flex max-w-[350px] items-center justify-between px-2">
      <Button
        className="text-md tracking-wider"
        variant="ghost"
        color="warning"
      >
        查看答案
      </Button>
      <Button
        className="text-md tracking-wider"
        variant="ghost"
        color="success"
      >
        重新開始
      </Button>
    </section>
  );
}
