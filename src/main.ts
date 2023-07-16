import "./styles/style.css";
import "./styles/tooltip.css";

import { items } from "./items.json";

interface WowItem {
  id: string;
  name: string;
  type: string;
  attributes: {
    [attribute: string]: number | undefined;
  };
}

function itemMouseOverHandler(e: MouseEvent) {
  const itemElement = e.target as HTMLSpanElement;
  const x = e.clientX;
  const y = e.clientY;

  const itemId = itemElement.getAttribute("data-itemid");
  const item = items.find((i) => i.id === itemId);
  if (item) {
    tooltipState.setItem(item);
    tooltipState.showTooltip(x, y);
  }
  // if (item) {
  //   console.log(item);
  // }
}

function itemMouseOutHandler(e: MouseEvent) {
  tooltipState.hideTooltip();
}
function createItemList(items: WowItem[], parentElement: HTMLElement) {
  const ul = document.createElement("ul");

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = ItemTemplate(item);
    li.querySelector("span")!.addEventListener(
      "mouseover",
      itemMouseOverHandler
    );
    li.querySelector("span")!.addEventListener("mouseout", itemMouseOutHandler);

    ul.appendChild(li);
  });

  parentElement.appendChild(ul);
}

function ItemTemplate(item: WowItem): string {
  return `<span data-itemid="${item.id}">${item.name}</span>`;
}

interface ToolTipState {
  tooltipVisible: boolean;
  hideTooltip: () => void;
  showTooltip: (x: number, y: number) => void;
  setItem: (item: WowItem) => void;
  toolTipElement: HTMLDivElement;
  x: number;
  y: number;
}

//TODO: move all this into a class, have the constructor take a DOM
// element to attach to or just generate the tooltip from a <template>
const tooltipState: ToolTipState = {
  tooltipVisible: false,
  hideTooltip: function () {
    this.tooltipVisible = false;
    this.toolTipElement?.classList.remove("tooltip-visible");
    this.toolTipElement?.classList.add("tooltip-hidden");
  },
  showTooltip: function (x: number = 10, y: number = 100) {
    this.toolTipElement.style.left = `${x}px`;
    this.toolTipElement.style.top = `${y}px`;
    this.tooltipVisible = true;
    this.toolTipElement?.classList.remove("tooltip-hidden");
    this.toolTipElement?.classList.add("tooltip-visible");
  },
  setItem: function (item: WowItem) {
    this.toolTipElement.querySelector(".tooltip-name")!.textContent = item.name;

    const itemType = item.type.split(" ");
    this.toolTipElement.querySelector(".tooltip-hands")!.textContent =
      itemType[0];
    this.toolTipElement.querySelector(".tooltip-weapon-type")!.textContent =
      itemType[1];

    const attributesList = document.createElement("ul");
    Object.keys(item.attributes).forEach((attrib) => {
      const li = document.createElement("li");
      li.textContent = `+${item.attributes[attrib]} ${attrib}`;
      attributesList.appendChild(li);
    });
    this.toolTipElement.querySelector(".tooltip-attributes")!.innerHTML = "";
    this.toolTipElement
      .querySelector(".tooltip-attributes")!
      .appendChild(attributesList);
  },
  toolTipElement: document.querySelector("#tooltip")!,
  x: 10,
  y: 100,
};

(function main() {
  createItemList(items, document.getElementById("app")!);
})();
