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
  tooltipState.showTooltip(x, y);
  if (item) {
    console.log(item);
  }
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
  toolTipElement: HTMLDivElement;
  x: number;
  y: number;
}

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
  toolTipElement: document.querySelector("#tooltip")!,
  x: 10,
  y: 100,
};

(function main() {
  createItemList(items, document.getElementById("app")!);
})();
