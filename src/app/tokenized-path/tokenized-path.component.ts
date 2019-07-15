import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { TdCodeEditorComponent } from "@covalent/code-editor";
import { __values } from 'tslib';


@Component({
  selector: 'app-tokenized-path',
  templateUrl: './tokenized-path.component.html',
  styleUrls: ['./tokenized-path.component.css']
})
export class TokenizedPathComponent extends AbstractControl implements OnInit, OnDestroy {
  @ViewChild('monaco') editor: TdCodeEditorComponent;

  @Input()
  code: string = `//Insert code here!`;


  @Input()
  externalLibCode: string;

  @Output()
  codeUpdated = new EventEmitter<string>();
  monaco;
  monacoLibs;
  private: string;
  base: AbstractControl;
  constructor() {
    super(pathValidatorFN, null);
  }

  get value(): string {
    return this.code;
  }

  set value(value: string) {
    this.code = value;
  }

  ngOnInit() {
    this.editor.editorOptions = {
      scrollBeyondLastLine: false,
      minimap: { enabled: false },
      lineNumbers: "off",
      base: 'vs',
      inherit: false,
      quickSuggestions: true, 
      rules: [
        { token: 'custom-info', foreground: '808080' },
        { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
        { token: 'custom-notice', foreground: 'FFA500' },
        { token: 'custom-date', foreground: '008800' },
      ]
    };
  }

  registerCustomLanguage(monacoEditor: any): void {
    let language: any = {
      id: 'BosTokensLanguage',
      suggestOnTriggerCharacters: true,

      monarchTokensProvider: [
        ['/\\[error.*/', 'custom-error'],
        ['/\\[notice.*/', 'custom-notice'],
        ['/\\[info.*/', 'custom-info'],
        ['/\\[[a-zA-Z 0-9:]+\\]/', 'custom-date'],
      ],
      customTheme: {
        id: 'myCustomTheme',
        theme: {
          base: 'vs', // or vs-dark
          inherit: true,
          rules: [
            { token: 'custom-info', foreground: '808080' },
            { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'custom-notice', foreground: 'FFA500' },
            { token: 'custom-date', foreground: '008800' },
          ],
        },
        lineNumbers: "off",
      },
      monarchTokensProviderCSS: `
        .monaco-editor .token.custom-info {
          color: grey;
        }
        .monaco-editor .token.custom-error {
          color: red;
          font-weight: bold;
          font-size: 1.2em;
        }
        .monaco-editor .token.custom-notice {
          color: orange;
        }
        .monaco-editor .token.custom-date {
          color: green;
        }
      `,
      completionItemProvider: {
        triggerCharacters: ['.'],
        suggestions: [
          {
            label: 'foobar1',
            kind: this.monaco.languages.CompletionItemKind.Snippet,
            insertText: '{{account-id}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, 
          {
            label: 'foobar2',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{account-id}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, 
          {
            label: 'foobar3',
            kind: this.monaco.languages.CompletionItemKind.Text,
            insertText: '{{account-id}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, 
          {
            label: 'token.{{account-id}}',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{account-id}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, {
            label: 'token.{{account-name}}',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{account-name}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, {
            label: 'token.{{source-filename}}',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{source-filename}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, {
            label: 'token.{{begin-date}}',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{begin-date}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, {
            label: 'token.{{end-date}}',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{end-date}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }, {
            label: 'token.{{now}}',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{now}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          },
          {
            label: 'function.format()',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: "|format('string')",
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          },
          {
            label: 'function.replace("old", "new")',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: "|replace('old','new')",
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          },
          {
            label: 'function.lower()',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: "|lower()",
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          },
          {
            label: 'function.upper()',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: "|upper()",
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }]
      },
    };
    monacoEditor.registerLanguage(language);
    monacoEditor.theme = 'myCustomTheme';
    monacoEditor.language = 'BosTokensLanguage';
    this.registerCompletionItemProvider(monacoEditor);
  }


  registerCompletionItemProvider(editor: any) {
    // Register a completion item provider for the new language
    editor.languages.registerCompletionItemProvider('BosTokensLanguage', { 
      provideCompletionItems: (model, position) => {
        // triggerCharacters: ["."],
        // find out if we are completing a property in the 'dependencies' object.
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        const match = textUntilPosition.match(
          /"dependencies"\s*:\s*{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*("[^"]*)?$/
        );
        var suggestions = [
        {
            label: 'foobar',
            kind: this.monaco.languages.CompletionItemKind.Keyword,
            insertText: '{{account-id}}',
            insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, 
        {
          label: 'token.{{account-id}}',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: '{{account-id}}',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, {
          label: 'token.{{account-name}}',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: '{{account-name}}',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, {
          label: 'token.{{source-filename}}',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: 'testing(${1:condition})',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, {
          label: 'token.{{begin-date}}',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: '{{begin-date}}',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, {
          label: 'token.{{end-date}}',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: '{{end-date}}',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, {
          label: 'token.{{now}}',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: '{{now}}',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        },
        {
          label: 'function.format()',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: "|format('string')",
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        },
        {
          label: 'function.replace("old", "new")',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: "|replace('old','new')",
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        },
        {
          label: 'function.lower()',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: "|lower()",
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        },
        {
          label: 'function.upper()',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: "upper()",
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }];
        return { suggestions: suggestions };
      }
    });
  }



  updateCode(e) {
    this.value = e;
    this.codeUpdated.emit(e);
  }

  onReady() {
    this.monaco = (window as any).monaco;
    // hmm https://github.com/microsoft/monaco-editor/issues/967

    this.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
      {
          allowNonTsExtensions: true
      });

     this.monacoLibs = this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
       this.externalLibCode,
       `inmemory://model/bos_features.d.ts`
     );
    this.registerCustomLanguage(this.editor);
  }

  ngOnDestroy(): void {
    if (this.monacoLibs) {
      this.monacoLibs.dispose()
    }
  }

  setValue(value: any, options?: Object) {
    this.code = value;
    this.value = value;
  }

  patchValue(value: any, options?: Object) {
    this.code = value;
    this.value = value;
  }

  reset(value: any, options?: Object) {
    this.code = value;
    this.value = value;
  }

  pathValidator(control: AbstractControl): { [key: string]: any } | null {
    let obj = { 'num': 1 };
    const jsonText: string = control.value;
    var jsonString: string = '';
    var hasError: boolean = false;
    let errorReturnValue = { 'jsonText': { hasError: true, errorDescription: "Invalid JSON text failed to parse" } }
    if (jsonText && jsonText.length > 0) {
      try {
        jsonString = JSON.parse(jsonText);
        hasError = false;
      }
      catch (ex) {
        hasError = true;
      }
    }
    if (hasError) {
      return errorReturnValue;
    }
    else {
      return null;
    }
  }
}

// http://server-name:8084/newPath?queryKey1=queryValue1&queryKey2=queryValue2
// {"key": 1}
// {"key":"val"}
//  {"menu": {"id": "file"}}
function pathValidatorFN(control: AbstractControl): { [key: string]: any } | null {
  let obj = { 'num': 1 };
  const pathText: string = control.value;
  var jsonString: string = '';
  var hasError: boolean = false;
  let errorReturnValue = { 'pathText': { hasError: true, errorDescription: "Invalid path failed to parse" } }
  if (pathText && pathText.length > 0) {
    try {
      hasError = false;
    }
    catch (ex) {
      hasError = true;
    }
  }
  if (hasError) {
    return errorReturnValue;
  }
  else {
    return null;
  }
}