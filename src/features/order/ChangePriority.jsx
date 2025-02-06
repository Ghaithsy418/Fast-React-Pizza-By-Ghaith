import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function ChangePriority() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">Change Priority</Button>
    </fetcher.Form>
  );
}

export default ChangePriority;
