/**
 * @generated SignedSource<<c6750a3d56e2568a08c394b3880d6e01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinBannerPublicClubFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderBannerFragment" | "ClubJoinBannerFragment">;
  readonly " $fragmentType": "JoinBannerPublicClubFragment";
};
export type JoinBannerPublicClubFragment$key = {
  readonly " $data"?: JoinBannerPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinBannerPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinBannerPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubHeaderBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "16f56e3e34fd6de30464b9114e770ac8";

export default node;
