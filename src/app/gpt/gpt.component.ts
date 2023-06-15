import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

const KEY = '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'
   /* 
    
   curl https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer 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" -d '{"model": "gpt-3.5-turbo","messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]}'
    
    */
@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})
export class GptComponent  implements OnInit{

  queryFormGroup!: FormGroup
  messages = [
    {role: 'system', content:'You are a helpful assistant'}
  ]
  result : any
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient){

  }
  ngOnInit(): void {
    this.queryFormGroup = this.formBuilder.group({
      query: this.formBuilder.control('')
    })
  }
  hundleAskGPT(): void{
    let url  = 'https://api.openai.com/v1/chat/completions'
    let payload = {
      model: 'gpt-3.5-turbo',
      messages: this.messages
    }
    let httpHeaders = new HttpHeaders().set('Authorization','Bearer '+KEY)
    
    console.log(this.queryFormGroup.controls['query'].value)
    this.httpClient.post(url,payload, {headers: httpHeaders} )
    .subscribe({
      next: (response)=>{
        this.result = response
      },
      error : (error)=>{
        console.log(error)
      }
    })
  }

}
