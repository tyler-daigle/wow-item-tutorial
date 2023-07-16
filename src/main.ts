import { items } from "./items.json";

interface WowItem {
  id: string;
  name: string;
  type: string;
  attributes: {
    [attribute: string]: number | undefined;
  };
}

function itemHoverHandler(e: MouseEvent) {
  const itemElement = e.target as HTMLSpanElement;

  const itemId = itemElement.getAttribute("data-itemid");
  const item = items.find((i) => i.id === itemId);
  if (item) {
    console.log(item);
  }
}

function createItemList(items: WowItem[], parentElement: HTMLElement) {
  const ul = document.createElement("ul");

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = ItemTemplate(item);
    li.querySelector("span")!.addEventListener("mouseover", itemHoverHandler);
    ul.appendChild(li);
  });

  parentElement.appendChild(ul);
}

function ItemTemplate(item: WowItem): string {
  return `<span data-itemid="${item.id}">${item.name}</span>`;
}

(function main() {
  createItemList(items, document.getElementById("app")!);
})();
