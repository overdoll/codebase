/**
 * @generated SignedSource<<e2ef2fb1d12a5edd68b21a7565a9a230>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSupportClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSupportClubFragment">;
  readonly " $fragmentType": "MetaSupportClubFragment";
};
export type MetaSupportClubFragment$key = {
  readonly " $data"?: MetaSupportClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSupportClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSupportClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSupportClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "406ef90e7be0cc9b005013ca97e3c465";

export default node;
