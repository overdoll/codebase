/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type UsernamesSettingsFragment$ref: FragmentReference;
declare export opaque type UsernamesSettingsFragment$fragmentType: UsernamesSettingsFragment$ref;
export type UsernamesSettingsFragment = {|
  +username: string,
  +usernames: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +username: string
      |}
    |}>
  |},
  +$refType: UsernamesSettingsFragment$ref,
|};
export type UsernamesSettingsFragment$data = UsernamesSettingsFragment;
export type UsernamesSettingsFragment$key = {
  +$data?: UsernamesSettingsFragment$data,
  +$fragmentRefs: UsernamesSettingsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UsernamesSettingsFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountUsernameConnection",
      "kind": "LinkedField",
      "name": "usernames",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountUsernameEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountUsername",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'e4cd4dbfcd94e7d5ae4d14c1ee066d8a';
module.exports = node;
