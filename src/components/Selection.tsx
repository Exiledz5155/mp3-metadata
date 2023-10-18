import { useSelectionContainer } from "@air/react-drag-to-select";

const App = () => {
  const { DragSelection } = useSelectionContainer();

  return (
    <div>
      <DragSelection />
      <div>Selectable element</div>
    </div>
  );
};
