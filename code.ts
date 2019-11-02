const dpi = 72;
const mmPerInch = 25.4;
const dpm = dpi / mmPerInch;

if (
  !figma.currentPage.selection.length ||
  figma.currentPage.selection.length > 1
) {
  figma.notify("Error: Please select 1 layer");
  figma.closePlugin();
} else {
  figma.showUI(__html__);

  const selection = figma.currentPage.selection[0];
  let selectionDimensions = {
    width: selection.width * dpm,
    height: selection.height * dpm
  };
  figma.ui.postMessage(selectionDimensions);

  figma.ui.onmessage = message => {
    selectionDimensions.width = message.width / dpm;
    selectionDimensions.height = message.height / dpm;

    if (message.type === "mm") {
      selection.resize(selectionDimensions.width, selectionDimensions.height);
    }

    figma.closePlugin();
  };
}
