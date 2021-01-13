/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RootUser$ref: FragmentReference;
declare export opaque type RootUser$fragmentType: RootUser$ref;
export type RootUser = {|
  +user: ?{|
    +username: string
  |},
  +$refType: RootUser$ref,
|};
export type RootUser$data = RootUser;
export type RootUser$key = {
  +$data?: RootUser$data,
  +$fragmentRefs: RootUser$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RootUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Authentication",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '2d4dfa0beae916942b0f479f8a2d3a0e';

module.exports = node;
