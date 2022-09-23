/**
 * @generated SignedSource<<a5a4fcd2b798d78364220405828bdf45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportLinksPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubExternalLinksFragment" | "ClubFooterButtonsFragment" | "ClubSupportBannerFragment">;
  readonly " $fragmentType": "SupportLinksPublicClubFragment";
};
export type SupportLinksPublicClubFragment$key = {
  readonly " $data"?: SupportLinksPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportLinksPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportLinksPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExternalLinksFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "66a54d4f135cb4f0e102e25894635dcb";

export default node;
