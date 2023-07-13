import { Injectable } from '@angular/core';

interface Tag {
  name: string;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogAddService {

  
  constructor() { }

  tags: Tag[] = [
    { name: 'Allgemein', imagePath: 'assets/img/sidenav/tag.png' },
    { name: 'Entwicklerteam', imagePath: 'assets/img/sidenav/tag.png' },
    // ... andere Tags ...
    
  ];
  newTag: string = '';

  async addTag(generatedTag: string) {
    this.newTag = generatedTag;
     if (this.newTag) {      
      const tag: Tag = { name: this.newTag, imagePath: 'assets/img/sidenav/tag.png' };
      await this.tags.push(tag);      
      setTimeout(() => {
        console.log(this.tags);
      }, 1000);
      
    }
  }

}
