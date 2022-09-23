/**
 * @generated SignedSource<<68515cf1779b34be7ed7475d1751d084>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaTopFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerTopFragment">;
  readonly " $fragmentType": "MetaTopFragment";
};
export type MetaTopFragment$key = {
  readonly " $data"?: MetaTopFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaTopFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaTopFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerTopFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "5482b9c1e271af9392608ad987819b01";

export default node;
