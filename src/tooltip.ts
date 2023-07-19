import { WowItem } from "./types";

export class Tooltip {
  public currentItem: WowItem | null = null;
  public tooltipElement: HTMLDivElement;
  public isVisible: boolean = false;

  constructor() {
    this.tooltipElement = document.createElement("div");
    this.tooltipElement.classList.add("tooltip");
    this.tooltipElement.classList.add("tooltip-hidden");
    document.body.appendChild(this.tooltipElement);
  }

  hide() {
    if (!this.isVisible) return; // already hidden

    this.isVisible = false;
    this.tooltipElement.classList.remove("tooltip-visible");
    this.tooltipElement.classList.add("tooltip-hidden");
  }

  show(x: number, y: number) {
    if (this.isVisible) return; // already visible

    this.isVisible = true;
    this.tooltipElement.classList.remove("tooltip-hidden");
    this.tooltipElement.classList.add("tooltip-visible");
    this.tooltipElement.innerHTML = "";
    this.tooltipElement.innerHTML = this.createHtml();
    this.tooltipElement.style.top = `${y}px`;
    this.tooltipElement.style.left = `${x}px`;
  }

  setItem(item: WowItem) {
    this.currentItem = item;
  }

  createHtml() {
    if (this.currentItem) {
      const [itemHands, itemType] = this.currentItem.type.split(" ");
      const attributes = Object.keys(this.currentItem.attributes);
      const attributesList = attributes.map((attr) => {
        return `<li>+${this.currentItem!.attributes[attr]} ${attr}}</li>`;
      });

      const template = `
        <span class="tooltip-name">${this.currentItem.name}</span>
        <span class="tooltip-item-level">Item Level 32</span>
        <span class="tooltip-binding">Binds when picked up</span>
        <div class="tooltip-weapon-type-container">
          <span class="tooltip-hands">${itemHands}</span>
          <span class="tooltip-weapon-type">${itemType}</span>
        </div>
        <div class="tooltip-attributes">
          <ul>
            ${attributesList.join("")}
          </ul>
        </div>
        <div class="tooltip-bonuses">
          <ul>
            <li>+50 Attack Power</li>
            <li>+2% Critical Strike</li>
          </ul>
        </div>
      `;
      return template;
    } else {
      return "";
    }
  }
}
