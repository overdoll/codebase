/**
 * @generated SignedSource<<634e813dab85553e820eeca4535dcce4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubCharacterViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubCharacterViewerFragment">;
  readonly " $fragmentType": "ContainerPublicClubCharacterViewerFragment";
};
export type ContainerPublicClubCharacterViewerFragment$key = {
  readonly " $data"?: ContainerPublicClubCharacterViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubCharacterViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubCharacterViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubCharacterViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ea1fbe8808421a90cf4b3e6e8bf41c6e";

export default node;
