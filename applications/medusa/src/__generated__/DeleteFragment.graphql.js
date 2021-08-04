/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DeleteFragment$ref: FragmentReference;
declare export opaque type DeleteFragment$fragmentType: DeleteFragment$ref;
export type DeleteFragment = {|
  +id: string,
  +email: string,
  +$refType: DeleteFragment$ref,
|};
export type DeleteFragment$data = DeleteFragment;
export type DeleteFragment$key = {
  +$data?: DeleteFragment$data,
  +$fragmentRefs: DeleteFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteFragment",
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
(node: any).hash = '1e70daac2f5bdbfb6f7895bda5c4b14b';
module.exports = node;
