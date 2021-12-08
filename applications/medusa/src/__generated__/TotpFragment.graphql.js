/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TotpFragment$ref: FragmentReference;
declare export opaque type TotpFragment$fragmentType: TotpFragment$ref;
export type TotpFragment = {|
  +id: string,
  +$refType: TotpFragment$ref,
|};
export type TotpFragment$data = TotpFragment;
export type TotpFragment$key = {
  +$data?: TotpFragment$data,
  +$fragmentRefs: TotpFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'b2c2093170a45d4ec9eb4b073e5bc47a';
module.exports = node;
