import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StringUtils {

  constructor() {}

  stringLimit(text, limit) {
    return (text.length < limit)? text : text.substr(0, limit);
  }
}