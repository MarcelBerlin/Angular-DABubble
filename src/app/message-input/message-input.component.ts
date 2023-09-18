import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { MessageInputServiceService } from './service/message-input-service.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  content: SafeHtml = '';
  inputText: any = HTMLBaseElement;
  inputLength: number = 0;
  @ViewChild('editableDiv', { static: false }) editableDiv!: ElementRef;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public inputService: MessageInputServiceService) { }


  getContent() {
    this.inputText = document.getElementById('inputDiv')?.innerHTML;
    this.inputLength = this.inputText.length;
    for (let i = 0; i < this.inputText.length; i++) {
      const element = this.inputText[i];
    }
  }

  onSpanMouseEnter(id: string): void {
    console.log('Span element hover', id);
    console.log(this.inputService.inputLinks[+id]);
    this.inputService.shownId = +id;
    this.inputService.showInputInfo = true;
  }

  onSpanMouseLeave(id: string): void {
    console.log('Span element leave', id);
    this.inputService.showInputInfo = false;
  }


  addHTMLTags() {
    this.inputService.setId += 1;
    const inputDiv = this.elementRef.nativeElement.querySelector('#inputDiv');

    let ankerElement = this.createAnkerElement();
    this.renderer.appendChild(inputDiv, ankerElement);

    let emptySpan = this.createEmptySpanElement();
    this.renderer.appendChild(inputDiv, emptySpan);

    this.inputService.inputLinks[this.inputService.setId] = this.createLinkInfo();
  }


  createLinkInfo() {
    return {
      textContent: this.inputService.textContent,
      emailContent: this.inputService.emailContent,
      class: this.inputService.class,
      linkTaget: this.inputService.linkTaget,
      setId: this.inputService.setId,
      name: this.inputService.name,
      filename: this.inputService.filename,
      nameType: this.inputService.nameType,
      userId: this.inputService.userId,
    };
  }


  createAnkerElement(): HTMLElement {
    const ankerElement = this.renderer.createElement('a');
    const text = this.renderer.createText(`${this.inputService.textContent}`);
    this.renderer.appendChild(ankerElement, text);
    this.renderer.setAttribute(ankerElement, 'contenteditable', 'false');
    this.renderer.setAttribute(ankerElement, `id`, `${this.inputService.setId}`);
    this.renderer.addClass(ankerElement, this.inputService.class);
    this.renderer.listen(ankerElement, 'mouseenter', () => {
      this.onSpanMouseEnter(`${this.inputService.setId}`);
    });
    this.renderer.listen(ankerElement, 'mouseleave', () => {
      this.onSpanMouseLeave(`${this.inputService.setId}`);
    });
    return ankerElement;
  }


  createEmptySpanElement(): HTMLElement {
    const emptySpan = this.renderer.createElement('span');
    const space = this.renderer.createText(' ');
    this.renderer.appendChild(emptySpan, space);
    return emptySpan;
  }


  saveHTMLTagsAndText(): any[] {
    this.inputService.contentArray = [];
    const editableDiv = this.editableDiv.nativeElement;
    const children = editableDiv.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (this.childIsAOrSpanTag(child)) {
        let tagInfo = this.createTagInfoForAandSPANTags(child.tagName, i, child.innerHTML);
        this.inputService.contentArray.push(this.addTagAttributes(child.attributes, tagInfo));
      } else if (this.childIsText(child)) {
        const textContent = child.textContent?.trim();
        if (textContent) this.inputService.contentArray.push(this.createTextInfoForText(i, textContent));
      }
    }
    this.addTagInfoLinkInfo();
    console.log(this.inputService.contentArray);
    return this.inputService.contentArray;
  }


  childIsAOrSpanTag(child: HTMLElement): boolean {
    return child instanceof HTMLElement && (child.tagName === 'A' || child.tagName === 'SPAN');
  }


  childIsText(child: HTMLElement): boolean {
    return child.nodeType === Node.TEXT_NODE;
  }


  createTagInfoForAandSPANTags(tagType: string, position: number, content: string) {
    return {
      tagType: tagType,
      position: position,
      attributes: [{}],
      content: content,
      linkInfo: [{}],
    };
  }


  createTextInfoForText(position: number, content: string) {
    return {
      tagType: 'text',
      position: position,
      attributes: [{}],
      content: content,
      linkInfo: [{}],
    };
  }


  addTagAttributes(attributes: any, tagInfo: any): any {
    for (let j = 0; j < attributes.length; j++) {
      const attribute = attributes[j];
      console.log(attribute.name, attribute.value)
      let aInfo = { name: attribute.name, value: attribute.value };
      tagInfo.attributes[j] = aInfo;
    }
    return tagInfo;
  }


  addTagInfoLinkInfo(): void {
    this.inputService.contentArray.forEach(index => {
      if (index.attributes.length > 3) {
        index.linkInfo[0] = this.inputService.inputLinks[index.attributes[2].value];
      }
    });
  }
}
