/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type JoinFragment$ref: FragmentReference;
declare export opaque type JoinFragment$fragmentType: JoinFragment$ref;
export type JoinFragment = {|
  +cookie: ?{|
    +redeemed: boolean,
    +registered: boolean,
    +sameSession: boolean,
    +email: string,
  |},
  +$refType: JoinFragment$ref,
|};
export type JoinFragment$data = JoinFragment;
export type JoinFragment$key = {
  +$data?: JoinFragment$data,
  +$fragmentRefs: JoinFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Cookie",
      "kind": "LinkedField",
      "name": "cookie",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "redeemed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registered",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sameSession",
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
      "storageKey": null
    }
  ],
  "type": "Authentication",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '2131db0e895b4149dd09217d251f274d';

module.exports = node;
