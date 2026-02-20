import { test, expect } from '@playwright/test';
import { hello, helloworld } from './demo/hello';

console.log(hello());
console.log(helloworld());