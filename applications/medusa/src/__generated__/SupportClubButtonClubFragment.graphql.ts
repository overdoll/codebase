/**
 * @generated SignedSource<<251d43aaa21216cdb3a8dd7953520da6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonClubFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "SupportClubButtonClubFragment";
};
export type SupportClubButtonClubFragment = SupportClubButtonClubFragment$data;
export type SupportClubButtonClubFragment$key = {
  readonly " $data"?: SupportClubButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5e78a44042b4a1b69e33bc6c700ebe65";

export default node;
