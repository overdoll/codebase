/**
 * @generated SignedSource<<5bd6004666d0810fb5c1f0699aadd1fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaNewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerNewFragment">;
  readonly " $fragmentType": "MetaNewFragment";
};
export type MetaNewFragment$key = {
  readonly " $data"?: MetaNewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaNewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaNewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerNewFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "287fa4e399826e3b6ebd8568fb00f6ce";

export default node;
