/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useUpdateCharacterFragment$ref: FragmentReference;
declare export opaque type useUpdateCharacterFragment$fragmentType: useUpdateCharacterFragment$ref;
export type useUpdateCharacterFragment = {|
  +id: string,
  +$refType: useUpdateCharacterFragment$ref,
|};
export type useUpdateCharacterFragment$data = useUpdateCharacterFragment;
export type useUpdateCharacterFragment$key = {
  +$data?: useUpdateCharacterFragment$data,
  +$fragmentRefs: useUpdateCharacterFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateCharacterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'c8cb89c751837604bd9afa7ba591bca6';
module.exports = node;
