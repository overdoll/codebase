/**
 * @generated SignedSource<<0a43000079606918f4b3752717d99bc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinBannerPublicClubFragment" | "SupportLinksPublicClubFragment">;
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
      "name": "SupportLinksPublicClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinBannerPublicClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5a6404b501af908f0ef7a2e6723cc9a0";

export default node;
