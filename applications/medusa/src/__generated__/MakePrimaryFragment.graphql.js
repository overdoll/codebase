/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MakePrimaryFragment$ref: FragmentReference;
declare export opaque type MakePrimaryFragment$fragmentType: MakePrimaryFragment$ref;
export type MakePrimaryFragment = {|
  +id: string,
  +email: string,
  +$refType: MakePrimaryFragment$ref,
|};
export type MakePrimaryFragment$data = MakePrimaryFragment;
export type MakePrimaryFragment$key = {
  +$data?: MakePrimaryFragment$data,
  +$fragmentRefs: MakePrimaryFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MakePrimaryFragment",
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
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "AccountEmail",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '9fe90f28be57ac0e819ab85109160030';
module.exports = node;
