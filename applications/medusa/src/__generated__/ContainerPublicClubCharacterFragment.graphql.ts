/**
 * @generated SignedSource<<8c34d8aea2b3c3f6b6dcfce64bbfbfba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubCharacterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubCharacterFragment" | "ScrollPublicClubCharacterFragment">;
  readonly " $fragmentType": "ContainerPublicClubCharacterFragment";
};
export type ContainerPublicClubCharacterFragment$key = {
  readonly " $data"?: ContainerPublicClubCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubCharacterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderPublicClubCharacterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubCharacterFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "b6d5d57d6609da02cf5bf67d4ce3b777";

export default node;
