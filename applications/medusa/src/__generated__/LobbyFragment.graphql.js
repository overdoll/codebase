/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type LobbyFragment$ref: FragmentReference;
declare export opaque type LobbyFragment$fragmentType: LobbyFragment$ref;
export type LobbyFragment = {|
  +email: string,
  +$refType: LobbyFragment$ref,
|};
export type LobbyFragment$data = LobbyFragment;
export type LobbyFragment$key = {
  +$data?: LobbyFragment$data,
  +$fragmentRefs: LobbyFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LobbyFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'dd3825df27d62b77d75d5deef1aa2f66';
module.exports = node;
