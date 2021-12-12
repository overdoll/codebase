/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type UsernameAliasCard$ref: FragmentReference;
declare export opaque type UsernameAliasCard$fragmentType: UsernameAliasCard$ref;
export type UsernameAliasCard = {|
  +id: string,
  +username: string,
  +$refType: UsernameAliasCard$ref,
|};
export type UsernameAliasCard$data = UsernameAliasCard;
export type UsernameAliasCard$key = {
  +$data?: UsernameAliasCard$data,
  +$fragmentRefs: UsernameAliasCard$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UsernameAliasCard",
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
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "AccountUsername",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'bd691ead6b274a5113ea3a3ef388045c';
module.exports = node;
