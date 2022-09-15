/**
 * @generated SignedSource<<21f5057cc98fa4d309fe6f1cfedefcdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaRouletteViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRouletteViewerFragment">;
  readonly " $fragmentType": "MetaRouletteViewerFragment";
};
export type MetaRouletteViewerFragment$key = {
  readonly " $data"?: MetaRouletteViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaRouletteViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaRouletteViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerRouletteViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b88ec0ec3b1008ef8c6a8cd3369a2da3";

export default node;
