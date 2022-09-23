/**
 * @generated SignedSource<<70bbc09fb7de4bad51975558131b06e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinBannerPublicClubViewerFragment" | "SupportLinksPublicClubViewerFragment">;
  readonly " $fragmentType": "HeaderPublicClubViewerFragment";
};
export type HeaderPublicClubViewerFragment$key = {
  readonly " $data"?: HeaderPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportLinksPublicClubViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinBannerPublicClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "4ca3cafa25393ba05e239da29bf29606";

export default node;
