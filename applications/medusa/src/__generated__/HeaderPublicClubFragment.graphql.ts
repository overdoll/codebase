/**
 * @generated SignedSource<<d826d4652b982a0442dda8f16c42fa92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubExternalLinksFragment" | "ClubFooterButtonsFragment" | "JoinBannerPublicClubFragment">;
  readonly " $fragmentType": "HeaderPublicClubFragment";
};
export type HeaderPublicClubFragment$key = {
  readonly " $data"?: HeaderPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExternalLinksFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinBannerPublicClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterButtonsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "4f8eb0d8f3c9170618b4073970a06500";

export default node;
