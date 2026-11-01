// Independently authored from this project's supplied Buoy language reference.
// Lexical highlighting only: these lists do not implement semantic validation.
export const declarations = `Class Const Declare Delegate Dim Enum Event Flags Function
Get Handle Implements Import Inherits Interface Optional Overrides Packed ParamArray
Private Property Protected Public Sequential Set Shared Structure Sub Var`.split(/\s+/);
export const control = `Case Catch Continue Do Each Else ElseIf End Exit Finally For
If Loop Next Return Select Then Throw Try Until Wend While`.split(/\s+/);
export const operators = `Alias And As CType In Is IsA Lib Me Mod New Not Of Or
Step Super To TryCast Xor`.split(/\s+/);
export const types = `Array Boolean Closure Double Int8 Int16 Int32 Int64 Integer
Optional Result String UInt8 UInt16 UInt32 UInt64`.split(/\s+/);
export const constants = ['False', 'Nil', 'True'];
export const directives = ['If', 'ElseIf', 'Else', 'End\\s+If', 'Define', 'Undef', 'Error', 'Warning'];
