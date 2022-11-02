/**
 * @generated SignedSource<<e7e41363599eca0b41d79c36edba3677>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeFragment">;
  readonly " $fragmentType": "MetaHomeFragment";
};
export type MetaHomeFragment$key = {
  readonly " $data"?: MetaHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerHomeFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "f72690cf156680a4e979245d331448e6";

export default node;
