/* istanbult ignore next */
export function emitShortcut({
  chr,
  ctrlKey = false,
  altKey = false,
  shiftKey = false,
  metaKey = false,
}) {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: chr,
      code: 'Key' + chr, // put everything you need in this object.
      shiftKey, // you don't need to include values
      ctrlKey, // if you aren't going to use them.
      metaKey, // these are here for example's sake.
      altKey,
    })
  );
}
