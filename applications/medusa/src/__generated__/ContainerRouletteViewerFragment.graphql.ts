/**
 * @generated SignedSource<<25304e1f6f1aae9fd7f8fcb6b1f50534>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerRouletteViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ShowRouletteSessionViewerFragment">;
  readonly " $fragmentType": "ContainerRouletteViewerFragment";
};
export type ContainerRouletteViewerFragment$key = {
  readonly " $data"?: ContainerRouletteViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRouletteViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerRouletteViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowRouletteSessionViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "9ab2c005fc050e9d22d8c47b7de3abae";

export default node;
