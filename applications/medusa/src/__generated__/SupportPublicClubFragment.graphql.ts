/**
 * @generated SignedSource<<fa8da3d023606449e78448b735c2e438>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportPublicClubFragment$data = {
  readonly canSupport: boolean;
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPromptFragment" | "ClubSupportSelectMethodFragment">;
  readonly " $fragmentType": "SupportPublicClubFragment";
};
export type SupportPublicClubFragment$key = {
  readonly " $data"?: SupportPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSupport",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportSelectMethodFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportPromptFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "99dfe0f0091722b9927fc275643c628c";

export default node;
