/**
 * @generated SignedSource<<0c18bd897a4836e1955d30c6426b77aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSearchCharacterViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCharacterViewerFragment">;
  readonly " $fragmentType": "ContainerSearchCharacterViewerFragment";
};
export type ContainerSearchCharacterViewerFragment$key = {
  readonly " $data"?: ContainerSearchCharacterViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCharacterViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSearchCharacterViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollSearchCharacterViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1074efc7d56351b820bcd728785b3f9c";

export default node;
