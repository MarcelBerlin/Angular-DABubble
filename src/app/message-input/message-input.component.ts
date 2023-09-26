import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { MessageInputServiceService } from './service/message-input-service.service';
import { VariablesService } from '../services/variables.service';
import { DataService } from '../services/data.service';
import { FileUploadService } from '../file-upload/services/file-upload.service';
import { DirectChatService } from '../direct-chat/services/direct-chat.service';
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


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public inputService: MessageInputServiceService,
    public varService: VariablesService,
    public dataService: DataService,
    private fileUploadService: FileUploadService,
    private directChatService: DirectChatService
    ) { }


    /**
     * Angular lifecycle hook that is called after the component has been initialized.
     * Subscribes to the myVariable$ observable from inputService, and when a new value is emitted,
     * it triggers the startApplicableButtonAction function if the new value is truthy.
     *
     * @returns {void}
     */
    ngOnInit():void {
      this.inputService.myVariable$.subscribe((newValue) => {
        if (newValue)  this.startApplicableButtonAction();
      });
    }

    
    /**
     * Performs various actions based on the state of inputService properties.
     * If nameType is 'EmojiType' or filename is not 'unset', it adds HTML tags.
     * If nameType is 'unset' and setId is -1, it saves HTML tags and text.
     * If 
     *
     * @returns {void}
     */
    async startApplicableButtonAction():Promise<void> {
      if (this.inputService.nameType == 'EmojiType') this.addHTMLTags();
      if (this.inputService.filename != 'unset') this.addHTMLTags();
      if (
        this.inputService.nameType == 'unset' 
        && this.inputService.setId == -1
        && !this.inputService.chatChange){
        this.saveMessage();
      } 
      if (this.inputService.chatChange) {
        this.removePlaceholder();
        setTimeout(()=>{ this.restorePlaceholder();}, 500);
        this.inputService.chatChange = false;
      }
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
    this.inputService.inputLinks[this.inputService.setId] = this.createLinkInfo();
    this.setCursorWithClick(`${this.inputService.setId}` + 'Span');
  }


  /**
   * Creates and returns a link information object based on properties from 'inputService'.
   *
   * @returns {object} - An object containing link information.
   * @property {string} textContent - The text content of the link.
   * @property {string} emailContent - The email content of the link.
   * @property {string} class - The CSS class of the link.
   * @property {string} linkTaget - The link target of the anchor element.
   * @property {number} setId - The identifier for this link.
   * @property {string} name - The name associated with the link.
   * @property {string} filename - The filename associated with the link.
   * @property {string} nameType - The type of name associated with the link.
   * @property {string} userId - The user ID associated with the link.
   */
  createLinkInfo(): object {
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


  /**
   * Creates an HTML anchor element (<a>) with specific attributes and event listeners.
   *
   * @returns {HTMLElement} The newly created anchor element.
   */
  createAnkerElement(): HTMLElement {
    const ankerElement = this.renderer.createElement('a');
    const index = this.inputService.setId;
    const text = this.renderer.createText(`${this.inputService.textContent}`);
    this.renderer.appendChild(ankerElement, text);
    this.renderer.setAttribute(ankerElement, 'contenteditable', 'false');
    this.renderer.setAttribute(ankerElement, `id`, `${this.inputService.setId}`);
    this.renderer.addClass(ankerElement, this.inputService.class);
    if(this.inputService.nameType != 'EmojiType'){
      this.renderer.listen(ankerElement, 'mouseenter', () => {
        this.onSpanMouseEnter(`${index}`);
      });
      this.renderer.listen(ankerElement, 'mouseleave', () => {
        this.onSpanMouseLeave(`${this.inputService.setId}`);
      });
    }
    return ankerElement;
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
   * Extracts and saves HTML tags and text content from an editable HTML div.
   *
   * @returns {any[]} An array containing objects representing extracted HTML tags and text content.
   */
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
    return this.inputService.contentArray;
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
   * Creates a tag information object for 'A' and 'SPAN' HTML tags.
   *
   * @param {string} tagType - The type of HTML tag ('A' or 'SPAN').
   * @param {number} position - The position of the tag in the DOM.
   * @param {string} content - The content of the tag.
   * @returns {object} - A tag information object with properties.
   */
  createTagInfoForAandSPANTags(tagType: string, position: number, content: string): object {
    return {
      tagType: tagType,
      position: position,
      attributes: [{}],
      content: content,
      linkInfo: [{}],
    };
  }


  /**
   * Creates an information object for a text node in the content.
   *
   * @param {number} position - The position of the text node in the content.
   * @param {string} content - The content of the text node.
   * @returns {Object} An object containing information about the text node.
   */
  createTextInfoForText(position: number, content: string): object {
    return {
      tagType: 'text',
      position: position,
      attributes: [{}],
      content: content,
      linkInfo: [{}],
    };
  }


  /**
   * Adds attributes to a tag information object.
   *
   * @param {NamedNodeMap} attributes - The attributes of a DOM element.
   * @param {any} tagInfo - The tag information object to which attributes will be added.
   * @returns {Object} The updated tag information object with attributes.
   */
  addTagAttributes(attributes: NamedNodeMap, tagInfo: any): Object {
    for (let j = 0; j < attributes.length; j++) {
      const attribute = attributes[j];
      let aInfo = { name: attribute.name, value: attribute.value };
      tagInfo.attributes[j] = aInfo;
    }
    return tagInfo;
  }


  /**
   * Adds link information to tag information objects based on attribute values.
   *
   * @returns {void}
   */
  addTagInfoLinkInfo(): void {
    this.inputService.contentArray.forEach(index => {
      if (index.attributes.length > 3) {
        index.linkInfo[0] = this.inputService.inputLinks[index.attributes[2].value];
      }
    });
  }

  
  setCursorWithClick(id:string): void {
    const el = document.getElementById(id);
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    const doubleClickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    el.dispatchEvent(doubleClickEvent);
  }


  saveMessage(){
    this.directChatService.saveMessage2(this.saveHTMLTagsAndText());
    this.inputService.contentArray = [];
    document.getElementById('inputDiv').innerHTML = '';
  }


  // Unused functions
  deleteFile(i: number) {
    const filepath = this.inputService.inputLinks[i].linkTaget;
    this.fileUploadService.deleteFile(filepath);
    this.inputService.inputLinks[i].linkTaget = 'unset';
    this.inputService.inputLinks[i].filename = 'unset';
  }

  // Placeholder
  ngAfterViewInit(){
    this.restorePlaceholder();
  }


  removePlaceholder():void {
    if (document.querySelector('.placeholder')) {
    const editableDiv = this.editableDiv.nativeElement;
    const placeholderElement = editableDiv.querySelector('.placeholder');
    this.renderer.removeChild(editableDiv, placeholderElement);
    }
  }


  restorePlaceholder() {
    if(!document.querySelector('.placeholder')) {
      const text = this.renderer.createText(this.inputService.placeholderText);
      const newPlaceholder = this.renderer.createElement('div');
      this.renderer.addClass(newPlaceholder, 'placeholder');
      this.renderer.setAttribute(newPlaceholder, `id`, 'placholder');
      this.renderer.appendChild(newPlaceholder, text);
      this.renderer.setAttribute(newPlaceholder, 'contenteditable', 'true');
      this.renderer.addClass(newPlaceholder, 'placeholder');
      this.renderer.appendChild(this.editableDiv.nativeElement, newPlaceholder);
    }
  }


  onLeave(){
    let textLenght = document.getElementById('inputDiv').textContent.trim().length;
    if (textLenght == 0){
      document.getElementById('inputDiv').innerText = '';
      this.restorePlaceholder();
    }
  }
}
