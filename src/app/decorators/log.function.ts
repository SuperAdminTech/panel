/* istanbul ignore next */
export function logFn(target, key, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  // tslint:disable-next-line: space-before-function-paren
  descriptor.value = function (...args: any[]) {
    const functionName = key;
    const result = originalMethod.apply(this, args);
    console.log(
      functionName + '(' + args.join(', ') + ') => ' + (result || 'void')
    );
    return result;
  };

  return descriptor;
}
