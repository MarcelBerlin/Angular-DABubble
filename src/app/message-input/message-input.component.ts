import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { MessageInputServiceService } from './service/message-input-service.service';
import { VariablesService } from '../services/variables.service';
import { DataService } from '../services/data.service';
import { FileUploadService } from '../file-upload/services/file-upload.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
import { MessageService } from '../services/messages.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  content: SafeHtml = ''; // ggf. aus html löschen
  inputText: any = HTMLBaseElement;
  inputLength: number = 0;
  timeoutArray: any[] = [];
  @ViewChild('editableDiv', { static: false }) editableDiv!: ElementRef;
  mySubscription;



  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public inputService: MessageInputServiceService,
    public varService: VariablesService,
    public dataService: DataService,
    private fileUploadService: FileUploadService,
    private directChatService: DirectChatService,
    private messageService: MessageService
  ) { }


  /**
   * Angular lifecycle hook that is called after the component has been initialized.
   * Subscribes to the myVariable$ observable from inputService, and when a new value is emitted,
   * it triggers the startApplicableButtonAction function if the new value is truthy.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.mySubscription = this.inputService.myVariable$.subscribe((newValue) => {
        if (newValue) this.startApplicableButtonAction();
      });
    }, 500);
  }


  ngAfterViewInit() {
    this.restorePlaceholder();
  }


  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }


  /**
   * Removes the placeholder element if it exists.
   *
   * @returns {void}
   */
  removePlaceholder(): void {
    if (document.querySelector('.placeholder')) {
      const editableDiv = this.editableDiv.nativeElement;
      const placeholderElement = editableDiv.querySelector('.placeholder');
      this.renderer.removeChild(editableDiv, placeholderElement);
      this.inputService.placeholerView = false;
    }
  }


  /**
   * Restores the placeholder element if it does not exist.
   *
   * @returns {void}
   */
  restorePlaceholder(): void {
    if (!document.querySelector('.placeholder')) {
      const text = this.renderer.createText(this.inputService.placeholderText);
      const newPlaceholder = this.renderer.createElement('div');
      this.renderer.addClass(newPlaceholder, 'placeholder');
      this.renderer.setAttribute(newPlaceholder, `id`, 'placholder');
      this.renderer.appendChild(newPlaceholder, text);
      this.renderer.setAttribute(newPlaceholder, 'contenteditable', 'true');
      this.renderer.addClass(newPlaceholder, 'placeholder');
      this.renderer.appendChild(this.editableDiv.nativeElement, newPlaceholder);
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
    let textLenght = document.getElementById('inputDiv').textContent.trim().length;
    if (textLenght == 0) {
      document.getElementById('inputDiv').innerText = '';
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
    if (this.inputService.sendButtonPressed()) {
      this.saveMessage();
    } else if (!this.inputService.sendButtonEnabled && this.inputService.enterButtonPressed) {
      this.editableDiv.nativeElement.blur();
    }
    if (this.inputService.newChatSelected()) {
      this.resetInputField();
    }
  }


  /**
   * Reset the input field.
   *
   * @returns {void}
   */
  resetInputField(): void {
    this.removePlaceholder();
    if (document.getElementById('inputDiv')) document.getElementById('inputDiv').innerText = '';
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
    this.varService.sign = !this.varService.sign;
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
    const inputDiv = this.elementRef.nativeElement.querySelector('#inputDiv');
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
   * Extracts and saves HTML tags and text content from the editableDiv.
   *
   * @returns {any[]} An array containing extracted HTML tags and text content.
   */
  saveHTMLTagsAndText(): any[] {
    this.inputService.contentArray = [];
    const editableDiv = this.editableDiv.nativeElement;
    const children = editableDiv.childNodes;
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
   * Saves the message content, clears the input field, and restores the empty input field
   *
   * @returns {void}
   */
  saveMessage(): void {
    if (this.varService.mainChatHead == 1 || this.varService.mainChatHead == 2) {
      this.directChatService.saveMessage(this.saveHTMLTagsAndText());
      this.inputService.contentArray = [];
      document.getElementById('inputDiv').innerHTML = '';
      this.restoreEmptyInput();
    } else if (this.varService.mainChatHead == 0) {
      this.messageService.newMessage.content = this.saveHTMLTagsAndText();
      document.getElementById('inputDiv').innerHTML = '';
      this.messageService.addMessage();
      this.restoreEmptyInput();
    }
  }

  /**
   * Restores the input field based on certain conditions after a delay.
   * If the enter button was not pressed, it restores the placeholder.
   * If the enter button was pressed, resets the flag, blurs the input field,
   * and simulates a click on the input after a delay.
   * 
   * @returns {void}
   */
  restoreEmptyInput(): void {
    setTimeout(() => {
      if (!this.inputService.enterButtonPressed) this.restorePlaceholder();
      else {
        this.inputService.enterButtonPressed = false;
        this.editableDiv.nativeElement.blur();
        setTimeout(() => {
        this.simulateClickOnInput();
        }, 100);
      }
    }, 500);
  }


  /**
   * Simulates a click event on the input element.
   * It sets the selection range, focuses on the input, and dispatches a click event.
   * Additionally, it disables the send button in the input service.
   * 
   * @returns {void}
   */
  simulateClickOnInput():void {
    const el = document.getElementById('inputDiv');
    const doubleClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    el.dispatchEvent(doubleClickEvent);
    this.inputService.sendButtonEnabled = false;
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
