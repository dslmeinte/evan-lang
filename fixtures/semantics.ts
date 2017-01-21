export interface ISemanticsTyped {
  $sType: string
}

export interface IBinaryOperation extends ISemanticsTyped {
  $sType: "binary operation"
  operator: string
  left: any
  right: any
}

export interface IComments extends ISemanticsTyped {
  $sType: "comments"
  text: string
}

export interface IFunctionApplication extends ISemanticsTyped {
  $sType: "function application"
  function: any
  arguments: { [name: string]: any }
}

export interface IFunctionDefinition extends ISemanticsTyped {
  $sType: "function definition"
  name: string
  parameters: { [name: string]: string }
  returnType?: string
  body: any
}

export interface IFunctionReference extends ISemanticsTyped {
  $sType: "function reference"
  name: string
}

export interface IHtmlElement extends ISemanticsTyped {
  $sType: "HTML element"
  tag: string
  classes: string
  contents: any
}

export interface IIfThenElse extends ISemanticsTyped {
  $sType: "if-then-else"
  condition: any
  trueBranch: any
  falseBranch: any
}

export interface IIssue extends ISemanticsTyped {
  $sType: "issue"
  message: string
  causedBy?: IIssue
}

export interface IObjectFunctionInvocation extends ISemanticsTyped {
  $sType: "object-function invocation"
  object: string
  function: string
  arguments: any
}

export interface IValueReference extends ISemanticsTyped {
  $sType: "value reference"
  name: string
}


export type SemanticsTyped =
  IBinaryOperation | IComments | IFunctionApplication | IFunctionDefinition | IFunctionReference | IHtmlElement | IIfThenElse | IIssue | IObjectFunctionInvocation | IValueReference


