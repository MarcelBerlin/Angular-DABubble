import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { MessageInputThreadService } from './service/message-input-thread.service';
import { VariablesService } from '../services/variables.service';
import { DataService } from '../services/data.service';
import { FileUploadService } from '../file-upload/services/file-upload.service';
import { SecondaryChatAnswerService } from '../dashboard/secondary-chat/service/secondary-chat-answer.service';
@Component({
  selector: 'app-message-input-thread',
  templateUrl: './message-input-thread.component.html',
  styleUrls: ['./message-input-thread.component.scss']
})
export class MessageInputThreadComponent {
  content: SafeHtml = ''; // ggf. aus html löschen
  inputText: any = HTMLBaseElement;
  inputLength: number = 0;
  timeoutArray: any[] = [];
  @ViewChild('editableDivThread', { static: false }) editableDivThread!: ElementRef;
  mySubscriptionThread;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public inputService: MessageInputThreadService,
    public varService: VariablesService,
    public dataService: DataService,
    private fileUploadService: FileUploadService,
    private answerService: SecondaryChatAnswerService
  ) { }


  /**
   * Angular lifecycle hook that is called after the component has been initialized.
   * Subscribes to the myVariableThread$ observable from inputService, and when a new value is emitted,
   * it triggers the startApplicableButtonAction function if the new value is truthy.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.mySubscriptionThread = this.inputService.myVariableThread$.subscribe((newValue) => {
        if (newValue) this.startApplicableButtonAction();
      });
    }, 500);
  }


  ngAfterViewInit() {
    this.restorePlaceholder();
  }


  ngOnDestroy(): void {
    this.mySubscriptionThread.unsubscribe();
  }


  /**
   * Removes the placeholder element if it exists.
   *
   * @returns {void}
   */
  removePlaceholder(): void {
    if (document.querySelector('.placeholderT')) {
      const editableDivThread = this.editableDivThread.nativeElement;
      const placeholderElement = editableDivThread.querySelector('.placeholderT');
      this.renderer.removeChild(editableDivThread, placeholderElement);
      this.inputService.placeholerView = false;
    }
  }


  /**
   * Restores the placeholder element if it does not exist.
   *
   * @returns {void}
   */
  restorePlaceholder(): void {
    if (!document.querySelector('.placeholderT')) {
      const text = this.renderer.createText(this.inputService.placeholderText);
      const newPlaceholder = this.renderer.createElement('div');
      this.renderer.addClass(newPlaceholder, 'placeholderT');
      this.renderer.setAttribute(newPlaceholder, `id`, 'placholderT');
      this.renderer.appendChild(newPlaceholder, text);
      this.renderer.setAttribute(newPlaceholder, 'contenteditable', 'true');
      this.renderer.addClass(newPlaceholder, 'placeholderT');
      this.renderer.appendChild(this.editableDivThread.nativeElement, newPlaceholder);
      this.inputService.placeholerView = false;
    }
  }


  /**
   * Handles the "onLeave" event, which checks if the inputDiv is empty and restores 
   * the placeholder if necessary.
   *
   * @returns {void}
   */
  onLeave(): void {
    let textLenght = document.getElementById('inputDivThread').textContent.trim().length;
    if (textLenght == 0) {
      document.getElementById('inputDivThread').innerText = '';
      this.restorePlaceholder();
    }
  }


  /**
   * Executes actions based on the selected input type and button press.
   *
   * @returns {void}
   */
  startApplicableButtonAction(): void {
    if (this.inputService.emojiSelected()) this.addHTMLTags();
    if (this.inputService.fileUploadSelected()) this.addHTMLTags();
    if (this.inputService.sendButtonPressed()) this.saveMessage();
    if (this.inputService.newChatSelected()) this.resetInputField();
  }


  /**
   * Reset the input field.
   *
   * @returns {void}
   */
  resetInputField(): void {
    this.removePlaceholder();
    document.getElementById('inputDivThread').innerText = '';
    setTimeout(() => { this.restorePlaceholder(); }, 500);
    this.inputService.chatChange = false;
  }


  /**
   * Handles the selection of a user and generates HTML elements based on the user's data.
   *
   * @param {number} index - The index of the selected user in a data array.
   * @returns {void}
   */
  selectedUser(index: number): void {
    this.inputService.setId += 1;
    this.inputService.textContent = '@' + this.dataService.userData[index].name;
    this.inputService.emailContent = this.dataService.userData[index].email;
    this.inputService.class = 'member';
    this.inputService.linkTaget = 'unset';
    this.inputService.name = this.dataService.userData[index].name;
    this.inputService.filename = 'unset';
    this.inputService.nameType = 'NameType';
    this.inputService.userId = this.dataService.userData[index].userId;
    this.addHTMLTags();
    this.varService.signThread = !this.varService.signThread;
  }


  /**
   * Event handler triggered when the mouse enters a <span> element.
   *
   * @param {string} id - The ID of the <span> element.
   * @returns {void}
   */
  onSpanMouseEnter(id: string): void {
    this.clearTimoutArray();
    this.inputService.shownId = +id;
    this.inputService.showInputInfo = true;
  }


  /**
   * Clears all timeouts stored in the timeoutArray.
   *
   * @returns {void}
   */
  clearTimoutArray(): void {
    for (let i = 0; i < this.timeoutArray.length; i++) {
      const element = this.timeoutArray[i];
      clearTimeout(element);
    }
  }


  /**
   * Event handler triggered when the mouse leaves a <span> element.
   *
   * @param {string} id - The ID of the <span> element.
   * @returns {void}
   */
  onSpanMouseLeave(id: string): void {
    let leaveTimeOut = setTimeout(() => {
      this.inputService.showInputInfo = false;
    }, 2000)
    this.timeoutArray.push(leaveTimeOut);
  }


  /**
   * Adds HTML tags to an input element, including an anchor (a) element and an empty span element.
   * Also creates and stores link information in the 'inputLinks' property of 'inputService'.
   *
   * @returns {void}
   */
  addHTMLTags(): void {
    const inputDiv = this.elementRef.nativeElement.querySelector('#inputDivThread');
    let ankerElement = this.createAnkerElement();
    this.renderer.appendChild(inputDiv, ankerElement);
    let emptySpan = this.createEmptySpanElement();
    this.renderer.appendChild(inputDiv, emptySpan);
    this.inputService.inputLinks[this.inputService.setId] = this.inputService.createLinkInfo();
    this.setCursorWithClick(`${this.inputService.setId}` + 'Span');
    this.inputService.enableSendButton();
  }


  /**
   * Creates an anchor element (a) with specified properties and content.
   *
   * @returns {HTMLElement} The created anchor element.
   */
  createAnkerElement(): HTMLElement {
    const ankerElement = this.renderer.createElement('a');
    const index = this.inputService.setId;
    const text = this.renderer.createText(`${this.inputService.textContent}`);
    this.renderer.appendChild(ankerElement, text);
    this.renderer.setAttribute(ankerElement, 'contenteditable', 'false');
    this.renderer.setAttribute(ankerElement, `id`, `${this.inputService.setId}`);
    this.renderer.addClass(ankerElement, this.inputService.class);
    if (!this.inputService.emojiSelected()) this.addMouseEvent(ankerElement, index);
    return ankerElement;
  }


  /**
   * Adds mouse event listeners to an anchor element.
   *
   * @param {HTMLElement} ankerElement - The anchor element to which listeners will be added.
   * @returns {void}
   */
  addMouseEvent(ankerElement: HTMLElement, index: number): void {
    this.renderer.listen(ankerElement, 'mouseenter', () => {
      this.onSpanMouseEnter(`${index}`);
    });
    this.renderer.listen(ankerElement, 'mouseleave', () => {
      this.onSpanMouseLeave(`${this.inputService.setId}`);
    });
  }


  /**
   * Creates an HTML span element (<span>) with a space character inside.
   *
   * @returns {HTMLElement} The newly created span element.
   */
  createEmptySpanElement(): HTMLElement {
    const emptySpan = this.renderer.createElement('span');
    const space = this.renderer.createText(' ');
    this.renderer.appendChild(emptySpan, space);
    this.renderer.setAttribute(emptySpan, `id`, `${this.inputService.setId}Span`);
    return emptySpan;
  }


  /**
   * Extracts and saves HTML tags and text content from the editableDivThread.
   *
   * @returns {any[]} An array containing extracted HTML tags and text content.
   */
  saveHTMLTagsAndText(): any[] {
    this.inputService.contentArray = [];
    const editableDivThread = this.editableDivThread.nativeElement;
    const children = editableDivThread.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      this.fillContentArray(child, i);
    }
    this.inputService.addTagInfoLinkInfo();
    return this.inputService.contentArray;
  }


  /**
   * Fills the contentArray with information from the provided child element.
   *
   * @param {HTMLElement} child - The child element to extract information from.
   * @param {number} i - The index of the child element.
   * @returns {void}
   */
  fillContentArray(child: HTMLElement, i: number): void {
    if (this.childIsAOrSpanTag(child)) {
      let tagInfo = this.inputService.createTagInfoForAandSPANTags(child.tagName, i, child.innerHTML);
      this.inputService.contentArray.push(this.inputService.addTagAttributes(child.attributes, tagInfo));
    } else if (this.childIsText(child)) {
      const textContent = child.textContent?.trim();
      if (textContent) {
        this.inputService.contentArray.push(this.inputService.createTextInfoForText(i, textContent));
      }
    }
  }


  /**
   * Checks if a given element is an HTML <a> (anchor) or <span> tag.
   *
   * @param {HTMLElement} child - The element to be checked.
   * @returns {boolean} True if the element is an <a> or <span> tag, otherwise false.
   */
  childIsAOrSpanTag(child: HTMLElement): boolean {
    return child instanceof HTMLElement && (child.tagName === 'A' || child.tagName === 'SPAN');
  }


  /**
   * Checks if a given element is a text node.
   *
   * @param {HTMLElement} child - The element to be checked.
   * @returns {boolean} True if the element is a text node, otherwise false.
   */
  childIsText(child: HTMLElement): boolean {
    return child.nodeType === Node.TEXT_NODE;
  }


  /**
   * Sets the cursor position to the start of the specified element and triggers a click event on it.
   *
   * @param {string} id - The ID of the HTML element.
   * @returns {void}
   */
  setCursorWithClick(id: string): void {
    const el = document.getElementById(id);
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    const doubleClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
    el.dispatchEvent(doubleClickEvent);
  }


  /**
   * Saves the message content, clears the input field, and restores the placeholder.
   *
   * @returns {void}
   */
  saveMessage(): void {
    this.answerService.newAnswer.content = this.saveHTMLTagsAndText();
    this.inputService.contentArray = [];
    document.getElementById('inputDivThread').innerHTML = '';
    this.answerService.sendAnswer();
    setTimeout(() => { this.restorePlaceholder(); }, 500);
  }


  // Unused functions
  /**
   * Deletes a file associated with the input at the specified index and updates inputLink properties.
   *
   * @param {number} i - The index of the input link to be deleted.
   * @returns {void}
   */
  deleteFile(i: number): void {
    const filepath = this.inputService.inputLinks[i].linkTaget;
    this.fileUploadService.deleteFile(filepath);
    this.updatesInputLinkProperties(i);
  }


  /**
   * updates inputLink properties.
   * 
   * @param {number} i - The index of the deleted input link. 
   */
  updatesInputLinkProperties(i: number): void {
    this.inputService.inputLinks[i].linkTaget = 'unset';
    this.inputService.inputLinks[i].filename = 'unset';
  }
}
