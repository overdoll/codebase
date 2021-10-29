/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type BrandFragment$ref: FragmentReference;
declare export opaque type BrandFragment$fragmentType: BrandFragment$ref;
export type BrandFragment = {|
  +brand: ?{|
    +id: string,
    +name: string,
  |},
  +$refType: BrandFragment$ref,
|};
export type BrandFragment$data = BrandFragment;
export type BrandFragment$key = {
  +$data?: BrandFragment$data,
  +$fragmentRefs: BrandFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BrandFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '98e2dd4ee32399fc44916237ee0549f5';
module.exports = node;
